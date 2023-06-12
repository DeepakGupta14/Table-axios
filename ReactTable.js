import React, { useEffect, useState } from 'react'
import axios from 'axios';
import _ from 'lodash';


const pageSize = 30;

const ReactTable = () => {
  const [reacttable, setreacttable] = useState();
  const [paginationReactTable, setpaginationReactTable] = useState();
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(res => {
        console.log(res.data);
        setreacttable(res.data);

        setpaginationReactTable(_(res.data).slice(0).take(pageSize).value());
      });
  }, []);

  const pageCount = reacttable ? Math.ceil(reacttable.length / pageSize) : 0;
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);
  const Pagination=(pageNo)=>{
    setcurrentPage(pageNo);
    const startIndex = (pageNo -1)*pageSize;
    const paginationReactTable = _(reacttable).slice(startIndex).take(pageSize).value();
    setpaginationReactTable(paginationReactTable)
  }

  return (
    <div>
      {
        !paginationReactTable ? ("Not Found") : (
          <table className='table'>
            <thead>
              <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>   {
              paginationReactTable.map((post, index) => (
                <tr key={index}>
                  <td>{post.id}</td>
                  <td>{post.name}</td>
                  <td>{post.email}</td>
                  <td>{post.body}</td>
                </tr>
              ))}
            </tbody>
          </table>

        )}
      <nav className='d-flex justify-content-center'>
        <ul className='pagination'>
          {
            pages.map((page) => (
              <li className={
                page === currentPage ? "page-item active" : "page-item"
              }>
                <p className='page-link' onClick={()=>Pagination(page)}>{page}</p>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
};

export default ReactTable
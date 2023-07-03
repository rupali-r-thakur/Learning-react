import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
function App() {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(11);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);
  console.log(users);
  const fetchApi = async () => {
    setLoading(true);
    const api = await fetch(
      ` https://dummyjson.com/users?limit=${limit}&skip=${
        (currentPage - 1) * 10
      }`
    ).then((res) => {
      return res.json();
    });
    setLoading(false);

    setUsers(api.users);
    setTotalPage (Math.round(api.total / limit));
  };

  useEffect(() => {
    fetchApi();
  }, [currentPage]);

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < 10) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <table
        class="table table-striped table-dark"
        style={{ minHeight: "85vh" }}
      >
        {loading === true ? (
          <div
            style={{
              height: "85vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <CircularProgress disableShrink size={200} />
          </div>
        ) : (
          <>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">password</th>
                <th scope="col">address</th>
                <th scope="col">phone</th>
                <th scope="col">age</th>
                <th scope="col">gender</th>
                <th scope="col">weight</th>
              </tr>
            </thead>
            <tbody>
              {users.map((element, index) => (
                <tr>
                  <th scope="row">{((currentPage-1)*limit)+index + 1}</th>
                  <td>{element.firstName}</td>
                  <td>{element.email}</td>
                  <td>{element.password}</td>
                  <td>{element.address.address}</td>
                  <td>{element.phone}</td>
                  <td>{element.age}</td>
                  <td>{element.gender}</td>
                  <td>{element.weight}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
      <nav aria-label="Page navigation example" style={{ textAlign: "center" }}>
        <ul class="pagination justify-content-center">
          <li class="page-item disabled" onClick={prePage}>
            <a tabindex="-1">
              Previous
            </a>
          </li>
          {Array.from(Array(totalPage), (elem, inx) => (
            <li
              class={currentPage == inx + 1 ? "page-item active" : "page-item"}
            >
              <a
                class="page-link"
                href="#"
                onClick={() => {
                  setCurrentPage(inx + 1);
                }}
              >
                {inx + 1}
              </a>
            </li>
          ))}

          <li class="page-item" onClick={nextPage}>
            <a>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default App;

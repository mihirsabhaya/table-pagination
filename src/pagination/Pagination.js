import React, { useState, useEffect } from "react";
import user from "./data";
import "bootstrap/dist/css/bootstrap.min.css";

const Pagination = () => {
    // get and set data
    const [data, setData] = useState(user);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // get ending point and starting point
    const LastIndex = currentPage * itemsPerPage;
    const firstIndex = LastIndex - itemsPerPage;

    // get data between starting point to ending point
    let pageData = data.slice(firstIndex, LastIndex);
    // console.log(pageData);

    const handleSelect = (e) => {
        // console.log(e.target.value);
        setItemsPerPage(e.target.value)
    }

    // for search input
    const [search, setSearch] = useState("")
    const [searchparam] = useState(["email", "first_name", "last_name"])

    const handleFilter = (e) => {
        // console.log(e.target.value.length);
        setSearch(e.target.value)
        console.log(search);
        // const filter_items = [...new Set(data.map((item) => item.region))];
        // console.log(filter_items);

        setData(
            () => {
                return data.filter((item) => {
                    return searchparam.some((newItem) => {
                        return (
                            item[newItem]
                                .toString()
                                .toLowerCase()
                                .indexOf(search.toLowerCase()) > - 1
                        );
                    });
                });
            }
        )
        if (e.target.value.length === 0) {
            console.log("set all data");
            setData(user)
        }

    }

    const handleDropdownFilter = () => {

    }

    return (
        <>
            {/* <h1>pagination</h1> */}
            <div className="w-100">
                <div className="text-start mt-4">
                    <input type="search" value={search} onChange={handleFilter} style={{ outline: "none" }} />

                    <select onChange={handleDropdownFilter}>
                        <option value="a_z">A-Z</option>
                        <option value="z_a">Z-A</option>
                    </select>

                    <label>select no. of items</label>
                    <select defaultValue={10} onChange={handleSelect}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <div className="table-responsive w-100 ">
                    <table className="table table-striped table-hover">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">first name</th>
                                <th scope="col">last name</th>
                                <th scope="col">email</th>
                                <th scope="col">gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* map of page data which have starting and ending point */}
                            {pageData.map((data, index) => {
                                // console.log(data);
                                return <TableItem data={data} key={index} />;
                            })}
                        </tbody>
                    </table>
                </div>
                <Paginate
                    totalData={data.length}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </>
    );
};

const TableItem = ({ data }) => {
    return (
        <tr scope="row">
            <td>{data.id}</td>
            <td>{data.first_name}</td>
            <td>{data.last_name}</td>
            <td>{data.email}</td>
            <td>{data.gender}</td>
        </tr>
    );
};

const Paginate = ({ totalData, itemsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];

    for (let i = 0; i < Math.ceil(totalData / itemsPerPage); i++) {
        pages.push(i);
    }

    return (
        <>
            <p className="border-0">{currentPage} out of {pages.length}</p>
            <div className="border-0 mt-3">
                {currentPage > 1 ? (
                    <button onClick={() => setCurrentPage(currentPage - 1)}>prev</button>
                ) : (
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled>
                        prev
                    </button>
                )}

                {
                    <>
                        {/* <button>...</button> */}
                        <button>{currentPage}</button>
                        {/* <button>...</button> */}
                    </>
                }


                {currentPage > pages.length - 1 ? (
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled>
                        next
                    </button>
                ) : (
                    <button onClick={() => setCurrentPage(currentPage + 1)}>next</button>
                )}
            </div>
        </>
    );
};

export default Pagination;

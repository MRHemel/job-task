import React, { useState } from 'react';


const Problem1 = () => {

    const [data, setData] = useState([]);
    const [show, setShow] = useState('all');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleClick = (event) => {
        event.preventDefault()
        const newData = { name, status };
        setData([...data, newData]);
        setName('');
        setStatus('');
        event.target.reset()
    };

    const getFilteredData = () => {
        if (show === 'active') {
            return data.filter((item) => item.status === 'active');
        } else if (show === 'completed') {
            return data.filter((item) => item.status === 'completed');
        } else {
            return data;
        }
    };



    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleClick} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input onChange={handleNameChange} type="text" className="form-control" placeholder="Name" name='name' />
                        </div>
                        <div className="col-auto">
                            <input onChange={handleStatusChange} type="text" className="form-control" placeholder="Status" name='status' />
                        </div>
                        <div className="col-auto">

                            <input className="btn btn-primary" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link `} type="button" onClick={() => setShow('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link `} type="button" onClick={() => setShow('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link `} type="button" onClick={() => setShow('completed')}>Completed</button>
                        </li>

                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getFilteredData().map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Problem1;
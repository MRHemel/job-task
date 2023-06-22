import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Problem2 = () => {
    const [modalAVisible, setModalAVisible] = useState(false);
    const [modalBVisible, setModalBVisible] = useState(false);
    const [modalCVisible, setModalCVisible] = useState(false);
    const [modalCData, setModalCData] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [onlyEven, setOnlyEven] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const openModalA = () => {
        setModalAVisible(true);
        setModalBVisible(false);
        setModalCVisible(false);
    };

    const openModalB = () => {
        setModalAVisible(false);
        setModalBVisible(true);
        setModalCVisible(false);
    };

    const openModalC = (contactId) => {
        const contact = contacts.find((item) => item.id === contactId);
        setModalCData(contact);
        setModalCVisible(true);
    };

    const closeModal = () => {
        setModalAVisible(false);
        setModalBVisible(false);
        setModalCVisible(false);
    };

    const handleSearchInputChange = (event) => {
        setFilterText(event.target.value);
    };

    const handleCheckboxChange = () => {
        setOnlyEven(!onlyEven);
    };

    const handleScroll = (event) => {
        const target = event.target;
        if (
            !loading &&
            target.scrollHeight - target.scrollTop === target.clientHeight
        ) {
            if (page < totalPages) {
                setPage(page + 1);
            }
        }
    };

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://contact.mediusware.com/api/contacts?page=${page}&filterText=${filterText}`
                );
                const { data, totalPages } = response.data;
                setContacts((prevContacts) => [...prevContacts, ...data]);
                setTotalPages(totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setLoading(false);
            }
        };

        fetchContacts();
    }, [page, filterText]);

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button onClick={openModalA} style={{ backgroundColor: '#46139f' }} className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
                    <button onClick={openModalB} style={{ backgroundColor: '#fff50' }} className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
                </div>

            </div>
            {modalAVisible && (
                <div className="modal">
                    <button
                        onClick={openModalA}
                        style={{ backgroundColor: '#46139f' }}
                    >
                        Modal Button A
                    </button>
                    <button
                        onClick={openModalB}
                        style={{ backgroundColor: '#fff50' }}
                    >
                        Modal Button B
                    </button>
                    <button onClick={closeModal} style={{ backgroundColor: '#46139f' }}>
                        Modal Button C
                    </button>
                    <input
                        type="checkbox"
                        checked={onlyEven}
                        onChange={handleCheckboxChange}
                    />
                    <label>Only even</label>
                    <input
                        type="text"
                        value={filterText}
                        onChange={handleSearchInputChange}
                    />
                    <ul className="contact-list" onScroll={handleScroll}>
                        {contacts.map((contact) => (
                            <li key={contact.id} onClick={() => openModalC(contact.id)}>
                                {contact.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {modalBVisible && (
                <div className="modal">
                    <button
                        onClick={openModalA}
                        style={{ backgroundColor: '#46139f' }}
                    >
                        Modal Button A
                    </button>
                    <button
                        onClick={openModalB}
                        style={{ backgroundColor: '#fff50' }}
                    >
                        Modal Button B
                    </button>
                    <button onClick={closeModal} style={{ backgroundColor: '#46139f' }}>
                        Modal Button C
                    </button>
                    <input
                        type="checkbox"
                        checked={onlyEven}
                        onChange={handleCheckboxChange}
                    />
                    <label>Only even</label>
                    <input
                        type="text"
                        value={filterText}
                        onChange={handleSearchInputChange}
                    />
                    <ul className="contact-list" onScroll={handleScroll}>
                        {contacts.map((contact) => (
                            <li key={contact.id} onClick={() => openModalC(contact.id)}>
                                {contact.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {modalCVisible && (
                <div className="modal">
                    <h2>Contact Details</h2>
                    {modalCData && (
                        <div>
                            <p>Name: {modalCData.name}</p>
                            <p>Email: {modalCData.email}</p>
                            <p>Phone: {modalCData.phone}</p>
                            <p>Country: {modalCData.country}</p>
                        </div>
                    )}
                </div>
            )}
        </div>

    );
};

export default Problem2;
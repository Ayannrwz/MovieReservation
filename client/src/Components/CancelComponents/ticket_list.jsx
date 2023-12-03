import { ExclamationCircleFilled, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
// import Highlighter from "react-highlight-words";
import { Alert, Button, Input, Modal, Space, Table, message } from "antd";

const { confirm } = Modal;

function Tickets() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [ticketList, setTicketList] = useState([]);
    const searchInput = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/tickets/all"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const movieData = await response.json();
                setTicketList(movieData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (ticketNumber) => {confirm({
        title: `Do you Want to delete ${ticketNumber.ticketNumber}?`,
        icon: <ExclamationCircleFilled />,
        content: "Please confirm deletion",
        onOk: async () => {
            try {
            const response = await fetch(
                "http://localhost:5000/api/tickets/delete",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ticketNumber }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            const indexToDelete = ticketList.findIndex(
                (ticket) => ticket.ticketNumber === ticketNumber.ticketNumber
            );

            // console.log(indexToDelete, ticketNumber.ticketNumber);

            if (indexToDelete !== -1) {
                const updatedList = [...ticketList];
                updatedList.splice(indexToDelete, 1);
                console.log(updatedList);
                setTicketList(updatedList);
            }

            message.success(`${ticketNumber.ticketNumber} deleted successfully`);
            // console.log(responseData.message);
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
        },
        onCancel() {
            console.log("Cancel");
        },
    });
        
    };


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: "#ffc069",
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ""}
        //         />
        //     ) : (
        //         text
        //     ),
    });

    const columns = [
        {
            title: "Ticket Number",
            dataIndex: "ticketNumber",
            key: "ticketNumber",
            width: "30%",
            ...getColumnSearchProps("ticketNumber"),
        },
        {
            title: "Seats",
            dataIndex: "seats",
            key: "seats",
            width: "20%",
            // ...getColumnSearchProps("seats"),
        },
        {
            title: "Movie ID",
            dataIndex: "movieId",
            key: "movieId",
            // ...getColumnSearchProps("movieId"),
        },
        {
            title: "Action",
            render: (ticketNumber) => (
                <Button onClick={() => handleDelete(ticketNumber)}>
                    Cancel Ticket
                </Button>
            ),
        },
    ];
    return (
        <Table
            pagination={{ pageSize: 7 }}
            columns={columns}
            dataSource={ticketList}
        />
    );
}
export default Tickets;

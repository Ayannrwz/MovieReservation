import { Table } from "antd";
import { useMovies } from "../Data/movie_data";
import MenuTest from "../test/menu";

function CancelTicket(){
    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Cinema',
          dataIndex: 'cinema',
          key: 'cinema',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        
        {
            title: 'Start',
            dataIndex: 'start',
            key: 'start',
          },
      ];

    return(
        <div>
            <h1>Cancel</h1>
        </div>
    )
}

export default CancelTicket;
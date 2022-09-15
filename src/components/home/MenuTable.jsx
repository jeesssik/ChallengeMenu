import { useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import { BiDetail } from 'react-icons/bi';
import { AiTwotoneDelete } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';

function useColumns() {
    const columns = useMemo(
        () => [
            {
                Header: '',
                accessor: 'image'
            },
            {
                Header: 'Name',
                accessor: 'title'
            },
            {
                Header: 'Vegan',
                accessor: 'vegan'
            },
            {
                Header: 'Ready in',
                accessor: 'readyIn'
            },
            {
                Header: 'Healt Score',
                accessor: 'healtScore'
            },
            {
                Header: 'Price',
                accessor: 'price'
            },
            {
                Header: 'Delete',
                accessor: 'delete'
            },
            {
                Header: 'Detail',
                accessor: 'detail'
            },
        ],
        []
    );
   
    return columns;
}

function useRows(dishes, removeItem) {
    const rows = 
        dishes.map( (p) => {
            return (
                {
                    image: <img className='img-thumbnail' src={p.image} alt={p.title} width='100px' />,
                    title: p.title,
                    vegan: `${p.vegan ? 'Vegan' : 'Not Vegan'}`, 
                    readyIn: `${p.readyInMinutes} min`,
                    healtScore: <div><AiFillStar className='iconStar' /> {p.healthScore}</div>,
                    price: `$${p.pricePerServing}`,
                    delete: <div className='ms-3 pointer'><AiTwotoneDelete className='icon' onClick={ () => removeItem(p) }/></div>,
                    detail: <div className='ms-3'><Link to={`/detalle/${p.id}`}><BiDetail className='icon' /></Link></div> 
                }
            )
        }) 
    return rows;
}

const MenuTable = ({ dishList, removeDishItem, priceTotal,  averageReadyIn, averageHealtScore, clearDishMenu }) => {
    
    const columns = useColumns();
    const data = useRows(dishList, removeDishItem);
    const table = useTable({ columns, data }); 
        
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = table; 

    return (
        <div className="table-responsive">
            <table className="table align-middle mt-5 mb-5" {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                <th scope="col" {...column.getHeaderProps()}>
                                    {
                                        column.render('Header')
                                    }
                                </th>
                                ))
                            }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                            );})
                                    }
                                </tr>
                            );
                        }) 
                    }
                    <tr>
                        <th colSpan="2" scope="row"></th>
                        <td className='fw-bold table-dark'>Averages</td>
                        <td className='table-dark'>{averageReadyIn()} min</td>
                        <td className='table-dark'>{averageHealtScore()}</td>
                        <td className='table-dark'>$ {priceTotal()}</td>
                        <td colSpan="2" className='me-1 table-dark text-center'><div className="link-warning pointer" onClick={() => clearDishMenu()}>--Delete All--</div></td>
                    </tr>
                </tbody> 
                
            </table>            
        </div>
    )
}

export default MenuTable; 
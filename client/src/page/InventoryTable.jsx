import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { usePageName } from '../context/PageNameContext';
import LineGraph from '../components/home/LineGraph';

const InventoryTable = () => {
    const { setPage } = usePageName();

    useEffect(() => {
        setPage('Inventory Records');
    }, []);

    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:3001/Inventory/inventorytable');
                setInventoryData(result.data);
            } catch (error) {
                console.error('Error fetching inventory table data:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            name: 'inventory_id',
            label: 'Inventory ID',
        },
        {
            name: 'date',
            label: 'Date',
            options: {
                customBodyRender: (value) => {
                    const formattedDate = new Date(value).toISOString().replace('T', '/').replace(/\.\d+Z$/, '');
                    return formattedDate;
                },
            },
        },
        'time',
        'total_weight_chips_11mm_unwashed',
        'total_weight_chips_11mm_washed',
        'total_weight_chips_9mm_unwashed',
        'total_weight_chips_9mm_washed',
        'total_weight_chips_7mm_unwashed',
        'total_weight_chips_7mm_washed',
        'total_weight_cocopeat_hi_ec',
        'total_weight_cocopeat_low_ec',
        'wastage_cocopeat_fiber',
        'wastage_cocopeat_fine_dust',
        'wastage_10c_sieved',
        'wastage_10c_not_sieved',
        'wastage_10c_upper_part',
        'total_weight_raw',
        'total_weight_wastage',
        'total_weight',
        'free_space',
    ];

    const options = {
        filterType: 'checkbox',
        selectableRows: false,
        fixedHeader: true, // This line fixes the header row
        scrollY: '400px', // Adjust the height as needed
        customBodyRender: (value, tableMeta, updateValue) => {
            return <div style={{ textAlign: 'center' }}>{value}</div>;
        },
    };

    return (
        <div className="p-4 ml-20">
            <MUIDataTable
               
                data={inventoryData}
                columns={columns}
                options={options}
            />
        </div>
    );
};

export default InventoryTable;

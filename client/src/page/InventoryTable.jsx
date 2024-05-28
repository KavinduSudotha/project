import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { usePageName } from '../context/PageNameContext';


const InventoryTable = () => {

  const { setPage } = usePageName();

  useEffect(() => {
    setPage('Inventory Records ' );
  }, []);

  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:3001/Inventory/inventorytable');
      setInventoryData(result.data);
    };

    fetchData();
  }, []);

  const columns = [
    'inventory_id',
    'date',
    'time',
    'total_weight_chips_11mm_unwashed',
    'total_weight_chips_11mm_washed',
    'total_weight_chips_9mm_unwashed',
    'total_weight_chips_9mm_washed',
    'total_weight_chips_7mm_unwashed',
    'total_weight_chips_7mm_washed',
    'total_weight_cocopeat_hi_ec',
    'total_weight_cocopeat_low_ec',
    'total_weight',
    'free_space',
  ];

  const options = {
    filterType: 'checkbox',
  };

  return (
    <div className="p-4  ml-20">
      <MUIDataTable
        title="Inventory Summary"
        data={inventoryData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default InventoryTable;

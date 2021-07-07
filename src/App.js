import React,{ useState, useEffect,useRef } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import Card from './components/Card';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {
  //  const rowData = [
  //      {make: "Toyota", model: "Celica", price: 35000},
  //      {make: "Ford", model: "Mondeo", price: 32000},
  //      {make: "Porsche", model: "Boxter", price: 72000}
  //  ];
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);


  useEffect(() => {
     fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
    }, []);

   const onButtonClick = e => {
         const selectedNodes = gridRef.current.api.getSelectedNodes()
         const selectedData = selectedNodes.map( node => node.data )
         const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ')
         alert(`Selected nodes: ${selectedDataStringPresentation}`)
     }


     const dateFilterParams = {
      // provide comparator function
      comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue;
  
          if (dateAsString == null) {
              return 0;
          }
  
          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          const dateParts = dateAsString.split('/');
          const day = Number(dateParts[2]);
          const month = Number(dateParts[1]) - 1;
          const year = Number(dateParts[0]);
          const cellDate = new Date(year, month, day);
  
          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
              return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
          }
          return 0;
      }
  };




   return (
    <div>
      <h3>colum view we are using</h3>
         <p>see docs here <a href="https://github.com/asseinfo/react-kanban">react-kanban</a>
         <br />
         <a href="https://nvjp3.csb.app/">see demo</a>
         </p>

         <Card/>
       <div className="ag-theme-alpine" style={{height: 400, width: 1600}}>

        
         <h3>grid view we are using</h3>
         <p>see docs here <a href="https://www.ag-grid.com/react-grid/filter-date/">Ag grid react doc</a></p>
         <button onClick={onButtonClick}>Get selected rows</button>
           <AgGridReact
            ref={gridRef}
            rowSelection="multiple"
            sideBar={true}
               rowData={rowData}>
               <AgGridColumn field="athlete" sortable={ true } filter={ true } checkboxSelection={true}></AgGridColumn>
               <AgGridColumn field="sport" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="age" sortable={ true } filter={ true }></AgGridColumn>

               <AgGridColumn field="year" sortable={ true } filter={ true }></AgGridColumn>
               <AgGridColumn field="date" sortable={ true } filter={ true } filterParams={dateFilterParams}></AgGridColumn>
               
           </AgGridReact>
       </div>
       
<br /><br />
      
       </div>
   );
};


export default App;

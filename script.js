$(document).ready(function () {
  // Create a datatable with dynamic columns
  createDataTable("#myTable", [
    { title: "Name", data: "name" },
    { title: "Age", data: "age" },
    { title: "Gender", data: "gender" },
  ]);

  // Example data
  var data = [
    { name: "John Doe", age: 30, gender: "Male" },
    { name: "Jane Doe", age: 25, gender: "Female" },
    { name: "Bob Smith", age: 45, gender: "Male" },
    { name: "John Doe", age: 30, gender: "Male" },
    { name: "Jane Doe", age: 25, gender: "Female" },
    { name: "Bob Smith", age: 45, gender: "Male" },
    { name: "John Doe", age: 30, gender: "Male" },
    { name: "Jane Doe", age: 25, gender: "Female" },
    { name: "Bob Smith", age: 45, gender: "Male" },
    { name: "John Doe", age: 30, gender: "Male" },
    { name: "Jane Doe", age: 25, gender: "Female" },
    { name: "Bob Smith", age: 45, gender: "Male" },
  ];

  // Load data into the datatable
  loadDataTableData("#myTable", data);
});

// Create a datatable with dynamic columns
function createDataTable(tableId, columns) {
  $(tableId).DataTable({
    columns: columns,
  });
}

// Load data into a datatable
function loadDataTableData(tableId, data) {
  $(tableId).DataTable().clear();
  $(tableId).DataTable().rows.add(data);
  $(tableId).DataTable().draw();
}

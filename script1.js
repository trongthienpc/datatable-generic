$(document).ready(function () {
  // Create a datatable with dynamic columns
  createDataTable("#myTable", [
    { title: "Name", data: "name" },
    { title: "Id", data: "id" },
    { title: "Age", data: "age" },
    { title: "Gender", data: "gender" },
    {
      title: "Salary",
      data: "salary",
      render: $.fn.dataTable.render.number(",", ".", 0, "$"),
    },
    {
      title: "Actions",
      data: null,
      defaultContent:
        "<button class='btn btn-primary btn-sm update'>Update</button> <button class='btn btn-danger btn-sm delete'>Delete</button>",
    },
  ]);

  // Example data
  var data = [
    { id: 1, name: "John", age: 30, gender: "Male", salary: 50000 },
    { id: 2, name: "Doe", age: 25, gender: "Female", salary: 60000 },
    { id: 3, name: "Smith", age: 45, gender: "Male", salary: 70000 },
    { id: 4, name: "Bob", age: 30, gender: "Male", salary: 50000 },
  ];

  // Load data into the datatable
  loadDataTableData("#myTable", data);

  // // Add click event handlers for the update and delete buttons
  // $("#myTable tbody").on("click", "button.update", function () {
  //   // var row = $(this).closest("tr");
  //   // var rowData = $("#myTable").DataTable().row(row).data();
  //   // Get the data for the selected row
  //   var rowData = $("#myTable").DataTable().row($(this).parents("tr")).data();
  //   // Get the index of the row
  //   var rowIndex = $("#myTable").DataTable().row($(this).parents("tr")).index();
  //   console.log("rowData :>> ", rowData);

  //   updateRow(rowData, rowIndex);
  // });

  // $("#myTable tbody").on("click", "button.delete", function () {
  //   // var row = $(this).closest("tr");
  //   var row = $("#myTable").DataTable().row($(this).parents("tr"));
  //   // var row = table.row($(this).parents("tr"));
  //   var rowData = $("#myTable").DataTable().row(row).data();
  //   var rowIndex = $("#myTable").DataTable().row($(this).parents("tr")).index();
  //   deleteRow(row);
  // });
});

// Create a datatable with dynamic columns
function createDataTable(tableId, columns) {
  $(tableId).DataTable({
    columns: columns,
  });
  $(tableId).on("click", "button.delete", function () {
    var rowData = $("#myTable").DataTable().row($(this).parents("tr")).data();
    deleteRow(rowData);
  });
  // Add click event handlers for the update and delete buttons
  $("#myTable tbody").on("click", "button.update", function () {
    var rowData = $("#myTable").DataTable().row($(this).parents("tr")).data();
    // Get the index of the row
    var rowIndex = $("#myTable").DataTable().row($(this).parents("tr")).index();
    updateRow(rowData, rowIndex);
  });
}

// Load data into a datatable
function loadDataTableData(tableId, data) {
  $(tableId).DataTable().clear();
  $(tableId).DataTable().rows.add(data);
  $(tableId).DataTable().draw();
}

function updateRow(rowData, rowIndex) {
  // Display the modal dialog
  $("#updateModal").modal("show");

  // Fill in the values in the form fields
  $("#updateModal .modal-body input[name='name']").val(rowData.name);
  $("#updateModal .modal-body input[name='age']").val(rowData.age);
  $("#updateModal .modal-body select[name='gender']").val(rowData.gender);
  $("#updateModal .modal-body input[name='salary']").val(rowData.salary);

  // Set up the submit handler for the form
  $("#updateForm")
    .off("submit")
    .on("submit", function (event) {
      event.preventDefault();

      // Get the updated values from the form fields
      var updatedData = {
        id: rowData.id,
        name: $("#updateModal .modal-body input[name='name']").val(),
        age: $("#updateModal .modal-body input[name='age']").val(),
        gender: $("#updateModal .modal-body select[name='gender']").val(),
        salary: $("#updateModal .modal-body input[name='salary']").val(),
      };
      console.log(
        "----------------------------------------------------------------"
      );

      // Update the data in the table
      var table = $("#myTable").DataTable();
      // var rowIndex = table.row($(rowData.row)).index();
      console.log("rowIndex :>> ", rowIndex);
      table.row(rowIndex).data(updatedData).draw();

      // Hide the modal dialog
      $("#updateModal").modal("hide");
    });
}

function deleteRow(rowData) {
  console.log("rowData :>> ", rowData);
  // Display the confirm modal
  $("#confirmModal").modal("show");

  // Remove any existing click event listeners from the "Delete" button
  $('#confirmModal .modal-footer button[name="delete"]').off("click");

  // When the user clicks the "Delete" button in the modal
  $('#confirmModal .modal-footer button[name="delete"]').on(
    "click",
    function deleteHandler() {
      // Get the id of the row to delete
      var id = rowData.id;

      // Get the table
      var table = $("#myTable").DataTable();

      // Find the row with the matching id and delete it
      table
        .rows(function (idx, data, node) {
          return data.id === id;
        })
        .remove()
        .draw();

      // // Remove the event listener
      // $('#confirmModal .modal-footer button[name="delete"]').off(
      //   "click",
      //   deleteHandler
      // );

      // Hide the modal
      $("#confirmModal").modal("hide");
    }
  );
}

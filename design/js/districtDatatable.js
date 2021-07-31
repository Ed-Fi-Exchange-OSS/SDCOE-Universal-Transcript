var table;
function initTableData() {
  let data = [
    {
      'studentSSID': '9856',
      'studentName': 'Darlene Robertson',
      'format': 'CLR',
      'requestedDate': '01/04/2020',
      'status': 'Approved',
      'action': '',
    },
    {
      'studentSSID': '9858',
      'studentName': 'Darlene Robertson',
      'format': 'CLR',
      'requestedDate': '01/04/2020',
      'status': 'Approved',
      'action': ''
    },
    {
      'studentSSID': '8858',
      'studentName': 'Jake Blake',
      'format': 'CLR',
      'requestedDate': '01/04/2020',
      'status': 'Pending',
      'action': ''
    },
    {
      'studentSSID': '4785',
      'studentName': 'Christina Park',
      'format': 'CLR',
      'requestedDate': '01/04/2020',
      'status': 'Denied',
      'action': ''
    },
  ]

  table = $('#district-datatable').DataTable({
    "processing": true,
    "scrollX": "900px",
    "dom": '<"top"i>rt<"bottom"flp><"clear">',
    language: {
      sLengthMenu: "Rows per page _MENU_",
      paginate: {
        next: "<svg width='8' height='10' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>" +
          "<path d='M1.99997 0L0.589966 1.41L5.16997 6L0.589966 10.59L1.99997 12L7.99997 6L1.99997 0Z' fill='#5A5A5A'/>" +
          "</svg>",
        previous: "<svg width='8' height='10' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>" +
          "<path d='M6.00003 0L7.41003 1.41L2.83003 6L7.41003 10.59L6.00003 12L3.43323e-05 6L6.00003 0Z' fill='#5A5A5A'/>" +
          "</svg>"
      }
    },
    data,
    columns: [
      { data: 'studentSSID' },
      { data: 'studentName' },
      { data: 'format' },
      { data: 'requestedDate' },
      {
        data: 'status',
        render: function (data, type, row, meta) {
          if (data === 'Pending') {
            return "<svg width='10' height='10' viewBox='0 0 10 10' fill='#FF9800' xmlns='http://www.w3.org/2000/svg'>" +
              "<circle cx='5' cy='5' r='5' />" +
              "</svg>" + "<span class='ml-2'>" + data + "</span>"
          }
          if (data === 'Approved') {
            return "<svg width='10' height='10' viewBox='0 0 10 10' fill='#4CAF50' xmlns='http://www.w3.org/2000/svg'>" +
              "<circle cx='5' cy='5' r='5' />" +
              "</svg>" + "<span class='ml-2'>" + data + "</span>"
          }
          if (data === 'Denied') {
            return "<svg width='10' height='10' viewBox='0 0 10 10' fill='#F44336' xmlns='http://www.w3.org/2000/svg'>" +
              "<circle cx='5' cy='5' r='5' />" +
              "</svg>" + "<span class='ml-2'>" + data + "</span>"
          }
          console.log(data);
          return data
        }
      },
      {
        data: null,
        'render': function (data, type, row, meta) {
          return '<div class="dropdown">' +
            '<button class="btn btn--secondary btn--action" type="button" id="dropdownMenuButton"data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#0AB1F1" />' +
            '</svg>' +
            '</button>' +
            '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">' +
            '<a class="dropdown-item" href="#">Download Transcript</a>' +
            '<a class="dropdown-item" href="#">Dropdown Link 2</a>' +
            '</div>' +
            '</div>'
        }
      },
    ]
  });

  $('#tableSearch').keyup(function () {
    table.search($(this).val()).draw();
  });
}

$(document).ready(function () {
  initTableData();
});

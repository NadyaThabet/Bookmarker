var nameInput = document.getElementById("nameInput");
var urlInput = document.getElementById("urlInput");

var bookMarks = [];

if (localStorage.getItem("bookMarks") != null) {
  bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
  displaybookMarks();
} else {
  bookMarks = [];
}

function addBookmark() {
  if (
    validateBookMarkName(nameInput.value) &&
    validateBookMarkUrl(urlInput.value)
  ) {
    var bookmark = {
      name: nameInput.value,
      url: urlInput.value,
    };

    bookMarks.push(bookmark);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    displaybookMarks();
    clearForm();
  }
}

function displaybookMarks() {
  if (bookMarks.length > 0) {
    document.getElementById("tHead").innerHTML = `<th scope="col">Index</th>
          <th scope="col">Website Name</th>
          <th scope="col">Visit</th>
          <th scope="col">Delete</th>`;
  }

  var tr = "";

  for (i = 0; i < bookMarks.length; i++) {
    tr += `<tr>
      <td>${i}</td>
      <td>${bookMarks[i].name}</td>
      <td>
        <button onclick="visitBookMark(${i})" class="btn btn-success text-white px-3 py-2""><i class="fa-solid fa-eye"></i> Visit</button>
      </td>
      <td>
        <button onclick="deleteBookMark(${i})" class="btn btn-danger px-3 py-2""><i class="fa-solid fa-trash-can"></i> Delete</button>
      </td>
      </tr>`;
  }

  document.getElementById("tBody").innerHTML = tr;
}

function clearForm() {
  nameInput.value = "";
  urlInput.value = "";
}

function visitBookMark(index) {
  var urlLink = bookMarks[index].url;
  if (!urlLink.startsWith("http://") && !urlLink.startsWith("https://")) {
    urlLink = "http://" + urlLink;
  }
  window.open(urlLink, "_blank");
}

function deleteBookMark(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger mx-2",
      cancelButton: "btn btn-success mx-2",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        bookMarks.splice(index, 1);
        displaybookMarks();
        localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your bookmark has been deleted.",
          icon: "success",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}

function validateBookMarkName(bookmarkName) {
  var BookMarkRegEx = /^[A-Z][a-z  0-9_/.]{2,40}$/;
  return BookMarkRegEx.test(bookmarkName);
}

function validateBookMarkUrl(bookmarkUrl) {
  var URLRegEx =
    /^((https?|ftp):\/\/)?(www\.)?([a-z0-9-]+\.)+[a-z]{2,}(:[0-9]+)?(\/[^\/\?#]+\/?|\/?)(\?[^\s#]+)?(#\S+)?$/i;

  return URLRegEx.test(bookmarkUrl);
}

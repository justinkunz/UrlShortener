$(document).ready(() => {
  $(".shrt-btn").on("click", async e => {
    e.preventDefault();
    const url = $(".shrt-inpt").val();
    const { short } = await $.post({
      url: "/api/url",
      data: { url }
    });
    showShortUrl(short);
  });
});

const showCopySuccess = () => {
  Swal.fire({
    title: "Successly Copied link",
    icon: "success"
  });
};
const showShortUrl = short => {
  Swal.fire({
    html: `<span class='title'>Your shortened URL</span>
      <h1>${short}</h1>`,
    showConfirmButton: true,
    focusConfirm: false,
    confirmButtonText: "Copy Link",
    preConfirm: () => {
      copyToClipboard(short);
      showCopySuccess();
    }
  });
};

const copyToClipboard = str => {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(str).select();
  document.execCommand("copy");
  $temp.remove();
};

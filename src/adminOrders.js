 $(document).ready(function () {
      $(".date-picker").persianDatepicker({
        format: "YYYY/MM/DD",
        initialValue: false,
        calendar: {
          persian: {
            locale: 'fa'
          }
        }
      });
    });
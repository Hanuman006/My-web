function validateForm() {
  let valid = true;

  const fields = [
    { id: 'name',    errId: 'nameError',    label: 'Full Name',     type: 'text'  },
    { id: 'email',   errId: 'emailError',   label: 'Email Address', type: 'email' },
    { id: 'phone',   errId: 'phoneError',   label: 'Mobile Number', type: 'phone' },
    { id: 'subject', errId: 'subjectError', label: 'Subject',       type: 'text'  },
    { id: 'message', errId: 'messageError', label: 'Message',       type: 'text'  },
  ];

  // Clear previous errors
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (el) { el.classList.remove('is-invalid', 'is-valid'); }
    if (err) { err.textContent = ''; }
  });

  document.getElementById('successAlert').classList.add('d-none');
  document.getElementById('errorAlert').classList.add('d-none');

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (!el) return;

    const val = el.value.trim();

    if (!val) {
      el.classList.add('is-invalid');
      if (err) err.textContent = f.label + ' is required.';
      valid = false;
      return;
    }

    if (f.type === 'email') {
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(val)) {
        el.classList.add('is-invalid');
        if (err) err.textContent = 'Enter a valid email address.';
        valid = false;
        return;
      }
    }

    if (f.type === 'phone') {
      const phoneReg = /^\d{10}$/;
      if (!phoneReg.test(val)) {
        el.classList.add('is-invalid');
        if (err) err.textContent = 'Mobile number must be exactly 10 digits.';
        valid = false;
        return;
      }
    }

    el.classList.add('is-valid');
  });

  if (valid) {
    document.getElementById('successAlert').classList.remove('d-none');
    // Reset form
    fields.forEach(f => {
      const el = document.getElementById(f.id);
      if (el) { el.value = ''; el.classList.remove('is-valid'); }
    });
  } else {
    const errAlert = document.getElementById('errorAlert');
    errAlert.classList.remove('d-none');
    document.getElementById('errorMsg').textContent = 'Please fix the errors highlighted below.';
  }
}

export function onlyNumbers(value) {
  if (!value) {
    return '';
  }
  return value.replace(/\D/g, '');
}

export function formatCpf(cpf) {
  if (!cpf) {
    return '';
  }

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatPaymentStatus(paymentStatus) {
  if (paymentStatus === 'CLOSED') {
    return 'PAGO';
  }
  return 'ABERTO';  
}

export function formatPhone(phone) {
  if (!phone) {
    return '';
  }
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

export function parseDateFromString(dateStr) {
  if (!dateStr) return null;

  const [day, month, year] = dateStr.split('/');
  if (!day || !month || !year) return null;

  const date = new Date(`${year}-${month}-${day}`);
  return isNaN(date) ? null : date;
}

export function parseDateTimeFromString(dateTimeStr) {
  if (!dateTimeStr) return null;

  const [datePart, timePart] = dateTimeStr.split(' ');

  if (!datePart || !timePart) return null;

  const [day, month, year] = datePart.split('/');
  const [hour, minute] = timePart.split(':');

  if (!day || !month || !year || !hour || !minute) return null;

  return `${year}-${month}-${day}T${hour}:${minute}:00`;
}

export function formatDate(dateIso) {
  if (!dateIso) return '';

  const date = new Date(dateIso);

  if (isNaN(date)) return '';

  const pad = (n) => String(n).padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatDateTime(date) {
  if (!(date instanceof Date) || isNaN(date)) return '';

  const pad = (n) => String(n).padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function formatToBRL(value) {
  if (value == null || isNaN(value)) {
    return '';
  }

  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function parseInternalServerErrorToToast(toaster, error, title) {
  if (error.response?.status === 500) {
    toaster.create({
      type: 'error',
      title,
      description: error.response.data.message
    });
  }
}

export function showSuccessToast(
  toaster,
  entityLabel,
  idEdit,
  gender
) {
  const actionVerb = getActionVerb(idEdit, gender);
  const title = `Cadastro de ${entityLabel}.`;
  const description = `${entityLabel} ${actionVerb} com sucesso!`;

  toaster.create({
    type: 'success',
    title,
    description
  });
}

export function getActionVerb(isEdit, gender) {
    const isFeminine = gender === 'f';
    if (isEdit) {
        return isFeminine ? 'alterada' : 'alterado';
    }
    return isFeminine ? 'criada' : 'criado';
}

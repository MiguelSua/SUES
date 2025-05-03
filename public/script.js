document.getElementById('form-pedido').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const datos = {
    nombre: form.nombre.value,
    telefono: form.telefono.value,
    servicio: form.servicio.value,
    fechaHora: form.fechaHora.value,
  };
  const res = await fetch('/pedidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  const json = await res.json();
  document.getElementById('mensaje').textContent = json.mensaje || 'Error';
  form.reset();
});

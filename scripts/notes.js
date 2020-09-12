let notes;

function init() {
  notes = JSON.parse(localStorage.getItem('notes') || '[]');
  render();
}

function save() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function render() {
  const notesClear = document.querySelectorAll('.note');
  notesClear.forEach(note => note.remove());

  const notesElement = document.querySelector('.notes');
  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.className = 'card note';
    noteElement.innerHTML = `
      <div class="card-header">
        <input type="text" class="form-control" onblur="setTitle(${index}, this.value)" value="${note.title}">
      </div>
      <div class="card-body">
        <textarea class="form-control" rows="4" onblur="setDesc(${index}, this.value)">${note.description}</textarea>
      </div>
      <button class="btn btn-light" onclick="del(${index})" title="Deletar anotação"> ✖ </button>
    `;
    notesElement.appendChild(noteElement);
  });
}

function add() {
  notes.push({ title: '', description: '' });
  save();
  render();
}

function del(index) {
  if (confirm('Confirmar deleção?')) {
    notes = notes.filter((_, i) => index !== i);
    save();
    render();
  }
}

function setTitle(index, title) {
  notes = notes.map((note, i) => index !== i ? note : { ...note, title });
  save();
}

function setDesc(index, description) {
  notes = notes.map((note, i) => index !== i ? note : { ...note, description });
  save();
}

init();
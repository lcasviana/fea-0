class Notes {
  notes;

  constructor() {
    this.notes = JSON.parse(localStorage.getItem('notes') || '[]');
    this.render();
  }

  render() {
    const notesClear = document.querySelectorAll('.note');
    notesClear.forEach(note => note.remove());

    const notesElement = document.querySelector('.notes');
    this.notes.forEach((note, index) => notesElement.appendChild(this.createNode(note, index)));
  }

  save() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  add() {
    this.notes.push({ title: '', description: '' });
    this.save();
    this.render();
  }

  del(index) {
    if (confirm('Confirmar deleção?')) {
      this.notes = this.notes.filter((_, i) => index !== i);
      this.save();
      this.render();
    }
  }

  createNode(note, index) {
    const noteElement = document.createElement('div');
    noteElement.className = `card note is-${note.color}`;
    noteElement.innerHTML = `
      <div class="card-header note__header">
        <input type="text" class="form-control" onblur="notes.setTitle(${index}, this.value)" value="${note.title}">
      </div>
      <div class="card-body note__body">
        <textarea class="form-control" rows="4" onblur="notes.setDesc(${index}, this.value)">${note.description}</textarea>
      </div>
      <div class="note__footer">
        <button class="btn btn-light note__footer--action" data-toggle="dropdown" title="Cor anotação"> 🎨 </button>
        <div class="dropdown-menu">
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'white')"> ⚪ </button>
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'green')"> 🟢 </button>
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'purple')"> 🟣 </button>
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'yellow')"> 🟡 </button>
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'red')"> 🔴 </button>
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'blue')"> 🔵 </button>
        </div>
        <button class="btn btn-light note__footer--action" onclick="notes.del(${index})" title="Deletar anotação"> ❌ </button>
      </div>
    `;
    return noteElement;
  }

  setTitle(index, title) {
    this.notes = this.notes.map((note, i) => index !== i ? note : { ...note, title });
    this.save();
  }

  setDesc(index, description) {
    this.notes = this.notes.map((note, i) => index !== i ? note : { ...note, description });
    this.save();
  }

  setColor(index, color) {
    this.notes = this.notes.map((note, i) => index !== i ? note : { ...note, color });
    this.save();
    this.render();
  }
}

const notes = new Notes();
class Note {

  constructor(
    title = '',
    description = '',
    color = 'white',
    createdAt = new Date(),
    modifiedAt = new Date(),
    important = false
  ) {
    this.title = title;
    this.description = description;
    this.color = color;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.important = important;
  }

  setTitle(title) {
    this.title = title;
    this.modifiedAt = new Date();
    return this;
  }

  setDescription(description) {
    this.description = description;
    this.modifiedAt = new Date();
    return this;
  }

  setColor(color) {
    this.color = color;
    this.modifiedAt = new Date();
    return this;
  }

  setImportant() {
    this.important = !this.important;
    this.modifiedAt = new Date();
    return this;
  }

  toElement(index) {
    const noteElement = document.createElement('div');
    noteElement.className = `card note is-${this.color}`;
    noteElement.innerHTML = `
      <div class="card-header note__header">
        <input type="text" class="form-control" onblur="notes.setTitle(${index}, this.value)" value="${this.title}"
          aria-label="Título da anotação ${(index + 1)}" title="Título da anotação ${(index + 1)}">
      </div>
      <div class="card-body note__body">
        <textarea class="form-control" rows="4" onblur="notes.setDesc(${index}, this.value)"
          aria-label="Descrição da anotação ${(index + 1)}" title="Descrição da anotação ${(index + 1)}"
          >${this.description}</textarea>
      </div>
      <div class="note__footer">
        <button class="btn btn-light note__footer--action" onclick="notes.setImportant(${index})"
          aria-label="${this.important ? `Desfavoritar anotação ${(index + 1)}` : `Favoritar anotação ${(index + 1)}`}"
          title="${this.important ? `Desfavoritar anotação ${(index + 1)}` : `Favoritar anotação ${(index + 1)}`}"
          > ${this.important ? '⭐' : '◾'} </button>
        <button class="btn btn-light note__footer--action" data-toggle="dropdown"
          aria-label="Alterar cor da anotação ${(index + 1)}" title="Alterar cor da anotação ${(index + 1)}"> 🎨 </button>
        <div class="dropdown-menu">
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'white')"
            aria-label="Alterar cor da anotação ${(index + 1)} para branco" title="Alterar cor da anotação ${(index + 1)} para branco"
            > ⚪ </button>
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'green')"
            aria-label="Alterar cor da anotação ${(index + 1)} para branco" title="Alterar cor da anotação ${(index + 1)} para verde"
            > 🟢 </button>
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'purple')"
            aria-label="Alterar cor da anotação ${(index + 1)} para branco" title="Alterar cor da anotação ${(index + 1)} para roxo"
            > 🟣 </button>
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'yellow')"
            aria-label="Alterar cor da anotação ${(index + 1)} para branco" title="Alterar cor da anotação ${(index + 1)} para amarelo"
            > 🟡 </button>
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'red')"
            aria-label="Alterar cor da anotação ${(index + 1)} para branco" title="Alterar cor da anotação ${(index + 1)} para vermelho"
            > 🔴 </button>
          <button class="btn btn-light" onclick="notes.setColor(${index}, 'blue')"
            aria-label="Alterar cor da anotação ${(index + 1)} para branco" title="Alterar cor da anotação ${(index + 1)} para azul"
            > 🔵 </button>
        </div>
        <button class="btn btn-light note__footer--action" onclick="notes.del(${index})"
          aria-label="Deletar anotação ${(index + 1)}" title="Deletar anotação ${(index + 1)}"> ❌ </button>
      </div>
    `;
    return noteElement;
  }

}

class Notes {
  notes;

  constructor() {
    this.notes = JSON.parse(localStorage.getItem('notes') || '[]')
      .map(note => new Note(note.title, note.description, note.color, note.createdAt, note.modifiedAt, note.important));
    this.render();
  }

  render() {
    const notesClear = document.querySelectorAll('.note');
    notesClear.forEach(note => note.remove());

    const notesElement = document.querySelector('.notes');
    this.notes.forEach((note, index) => notesElement.appendChild(note.toElement(index)));
  }

  save() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  add() {
    this.notes = [...this.notes, new Note()];
    this.save();
    this.render();
  }

  del(index) {
    if (confirm(`Confirmar deleção da anotação ${(index + 1)}?`)) {
      this.notes = this.notes.filter((_, i) => index !== i);
      this.save();
      this.render();
    }
  }

  setTitle(index, title) {
    this.notes = this.notes.map((note, i) => index !== i ? note : note.setTitle(title));
    this.save();
  }

  setDesc(index, description) {
    this.notes = this.notes.map((note, i) => index !== i ? note : note.setDescription(description));
    this.save();
  }

  setColor(index, color) {
    this.notes = this.notes.map((note, i) => index !== i ? note : note.setColor(color));
    this.save();
    this.render();
  }

  setImportant(index) {
    this.notes = this.notes.map((note, i) => index !== i ? note : note.setImportant());
    this.save();
    this.render();
  }

  sort(property) {
    let sortBy;
    switch (property) {
      case 'createdAt':
        sortBy = (a, b) => new Date(a.createdAt) - new Date(b.createdAt);
        break;
      case 'modifiedAt':
        sortBy = (a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt);
        break;
      case 'color':
        sortBy = (a, b) => a.color.localeCompare(b.color);
        break;
      case 'important':
        sortBy = (a, b) => b.important - a.important;
        break;
      default: return;
    }
    this.notes.sort(sortBy);
    this.save();
    this.render();
  }
}

const notes = new Notes();
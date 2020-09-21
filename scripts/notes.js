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

  toElement(index) {
    const noteElement = document.createElement('div');
    noteElement.className = `card note is-${this.color}`;
    noteElement.innerHTML = `
      <div class="card-header note__header">
        <input type="text" class="form-control" onblur="notes.setTitle(${index}, this.value)" value="${this.title}">
      </div>
      <div class="card-body note__body">
        <textarea class="form-control" rows="4" onblur="notes.setDesc(${index}, this.value)">${this.description}</textarea>
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
    this.notes.push(new Note());
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
        sortBy = (a, b) => a.important - b.important;
        break;
      default: return;
    }
    this.notes.sort(sortBy);
    this.save();
    this.render();
  }
}

const notes = new Notes();
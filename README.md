# Webseite der Kadetten Zürich

## Seite erstellen
Im Ordner [pages](https://github.com/FalkZ/kadetten/tree/master/pages) sind die Seiten als Markdown Datei (.md) gespeichert. Sie werden automatisch eingelesen. Um eine neue Seite zu erstellen kann man einfach eine neue Datei erstellen.

#### 1. Titel
Der Titel der Seite wird mit ``` # Titel ``` auf der ersten Zeile definiert.

#### 2. Seiten Symbol
Das Symbol dieser Seite wird mit ``` icon: icon_name ``` definiert die Namen der verfügbaren icons findet man unter [Material icons](https://material.io/icons/).

#### 3. Notizen
Alles vor dem ersten Abschnitt wird ausgeblendet. Hier können also auch noch Notizen gemacht werden.

#### 4. Abschnitte
Die Abschnitte werden mit ``` ## Untertitel ``` definiert. Nach dem Untertitel kann normaler Text eingefügt werden.

#### 5. Weiteres
Weitere Funktionen von Markdown findet man unter [Mastering Markdown](https://guides.github.com/features/mastering-markdown/).

#### Komplettes Beispiel
```markdown
# Titel
icon: icon_name
Notizen ...

## 1. Abschnitt
Text ...

## 2. Abschnitt ...
```

## Dependencies
- [React](https://reactjs.org/)
- [Material UI](http://www.material-ui.com/#/)
- Icons:
  - [Material icons](https://material.io/icons/)
  - [ionicons](http://ionicons.com/)

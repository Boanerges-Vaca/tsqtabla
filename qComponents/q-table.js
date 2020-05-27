import { LitElement, html } from "lit-element";
export class QTable extends LitElement {
    constructor(datos) {
        super();
        this._ColHiden = null;
        this._headers = null;
        this._datos = null;
        if (this.verificarDatos(datos)) {
            this._headers = Object.keys(datos[0]);
            this._datos = datos;
        }
    }
    static get properties() {
        return {
            datas: { type: Array() }
        };
    }
    getDatos() {
        return this._datos;
    }
    render() {
        if (this._datos == null) {
            return html `<h2>No Tiene Datos</h2>`;
        }
        else {
            return html `
        <table>
          <thead>
            <tr>
                ${this._headers.map((header) => html `<th>${header}</th>`)}
            </tr>
          </thead>
          <tbody>
              ${this._datos.map((row) => html `<tr>
                  ${this._headers.map((col) => html `<td> <input type="text" .value="${row[`${col}`]}"></td>`)}
              </tr>`)}
          </tbody>
        </table>
      `;
        }
    }
    init(datos) {
        console.log("tabla component init");
        if (this.verificarDatos(datos)) {
            this._datos = datos;
        }
        else {
            console.log("los datos no son validos");
        }
        console.log(this._datos);
        console.log(this.shadowRoot);
    }
    /** funcion que verifica que el que los datos no sean null, undefined,
     * que el array no este vacio, o que el array este compuesto por elementos que no sean objetos
     *
     */
    verificarDatos(datos) {
        if (datos === undefined)
            return false;
        if (datos === null)
            return false;
        if (datos.length === 0)
            return false;
        if (typeof datos[0] !== "object")
            return false;
        return true;
    }
}
customElements.define("q-tabla", QTable);
//# sourceMappingURL=q-table.js.map
import { LitElement, html, css } from "lit-element";

export class QTable extends LitElement {
  /// array de Objeto que contrendra los datos de la tabla.
  private _datos: Array<any> | null;

  /**
   * array con los Nombres de las columnas que se ocultaran
   * -- al agregar se verificara que coincidan con los nombres de las propiedades del objeto
   */
  private _ColHiden: Array<String>|null;

  /** Indica si la tabla es solo lectura, no se permite editar Datos */
  private _readOnly:boolean;

  private _headers: Array<String>|null;

  constructor(datos: Array<any> | null) {
    super();
    this._readOnly=true;
    this._ColHiden=null;
    this._headers=null;
    this._datos=null;  

    if(this.verificarDatos(datos)){
      this._headers = Object.keys((<Array<any>>datos)[0]);
      this._datos = datos;
    }
  }

  static get properties(){
    return{
      datas:{type:Array<any>()}
    }
  }

  public getDatos(): Array<any> | null {
    return this._datos;
  }

  render() {
    if (this._datos == null) {
      return html `<h2>No Tiene Datos</h2>`;
    } else {
      return html `
        <table>
          <thead>
            <tr>
                ${(<Array<String>>this._headers).map((header) => html`<th>${header}</th>`)}
            </tr>
          </thead>
          <tbody>
              ${(<Array<any>>this._datos).map((row)=> html `<tr>
                  ${(<Array<String>>this._headers).map((col) => html`<td> <input type="text" .value="${row[`${col}`]}"></td>`)}
              </tr>`)}
          </tbody>
        </table>
      `;
    }
  }

  init(datos: Array<any>|null){
    console.log("tabla component init");
    if (this.verificarDatos(datos)) {
      this._datos=datos
    }
    else{
      console.log("los datos no son validos");
    }
    console.log(this._datos);
    console.log(this.shadowRoot);
  }

  /** funcion que verifica que el que los datos no sean null, undefined,
   * que el array no este vacio, o que el array este compuesto por elementos que no sean objetos
   * 
   */
  private  verificarDatos(datos: Array<any>|null):boolean{
    if(datos=== undefined) return false;
    if(datos === null) return false;
    if(datos.length===0) return false;
    if (typeof datos[0] !== "object") return false
    return true;
  }
  
}
customElements.define("q-tabla", QTable);


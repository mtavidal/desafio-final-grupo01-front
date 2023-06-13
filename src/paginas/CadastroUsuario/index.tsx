import styles from "./CadastroUsuario.module.css";

export default function CadastroUsuario() {
  return <div>Pagina CadastroUsuario

<div className={styles.container}>
      <header className={styles.header}>
        <img src="" alt="" />
        <h1>Criar uma conta</h1>
        <p>Compre rápido e acompanhe seus pedidos em um só lugar!</p>
      </header>

      <form>
        <div className={styles.inputContainer}>
        <input type="text" placeholder="Nome Completo"/>
        
          
          <input 
          type="text" 
          name="email" 
          id="email" 
          placeholder="Email" 
          />
        </div>

        <div className={styles.inputContainer}>
          
          <input
           type="password" 
           name="password" 
          id="password" 
          placeholder="Senha"
          /> 

<input
           type="password" 
           name="password" 
          id="password" 
          placeholder="Confirme sua senha"
          />
      
      </div>
      
      <button className={styles.button}>
        Cadastrar <img src="" alt="" />
      </button>
   
      
      
      </form>
      <div className={styles.footer}>
       </div> 
      </div>j
  </div>;
}

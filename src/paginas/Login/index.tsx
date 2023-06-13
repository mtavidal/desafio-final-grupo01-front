import styles from "./Login.module.css";

export default function Login() {
  return <div>Pagina Login
 
 <div className={styles.container}>
      <header className={styles.header}>
        <img src="" alt="" />
        <h1>Faça seu login</h1>
       
      </header>

      <form>
        <div className={styles.inputContainer}>
        
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
          placeholder="Password"
          /> 

       </div>
      
      <button className={styles.button}>
        Entrar <img src="" alt="" />
      </button>

      </form>
      <div className={styles.footer}>
        <div className="footer">
          <p>Não é cadastrado? <a href="">Crie sua conta </a></p>
          
        </div>
       </div> 
      </div>
     
  </div>;

}

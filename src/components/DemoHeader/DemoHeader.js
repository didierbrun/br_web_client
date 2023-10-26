import styles from './styles.module.css'
import br_logo from '../../medias/logo_white.svg'
import dolby_logo from '../../medias/dolby_logo.png'
import cross_icon from '../../medias/cross.png'

const logos = {
    dolby: dolby_logo 
}

const DemoHeader = ( { title, logo } ) => {
    return (
        <div className={styles.container}>
            <img src={br_logo} className={styles.logo}/>
            <img src={cross_icon} className={styles.cross}/>
            <img src={logos[logo]} className={styles.partner_logo}/>
            <div className={styles.title}>{title}</div>
        </div>
    )
}

export default DemoHeader
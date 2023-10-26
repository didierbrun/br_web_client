import styles from './styles.module.css'

const SimpleButton = ({ onClick, label }) => {
    return (
        <div className={styles.container} onClick={() => {onClick()}}>
            {label}
        </div>
    )
}

export default SimpleButton
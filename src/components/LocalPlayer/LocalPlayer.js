import styles from './styles.module.css'

const LocalPlayer = () => {
    return (
        <div className={styles.container}>
            <div id='other_player'>
                <div/>
            </div>
            <div id='local_player' className={styles.other_player}>
                <div />
            </div>
        </div>
    )
}

export default LocalPlayer
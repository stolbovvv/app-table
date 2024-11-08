import { observer } from 'mobx-react-lite';
import styles from './Dialog.module.css';
import { planetsStore } from '@/models/planetsStore';
import { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';

export const Dialog = observer(function Dialog() {
	const { state, closeDeletingDialog, deletePlanetById } = planetsStore;
	const dialogRef = useRef<HTMLDialogElement>(null);

	const handleDelete = () => {
		if (state.deletingDialog.planetId) deletePlanetById(state.deletingDialog.planetId);
	};

	useEffect(() => {
		if (state.deletingDialog.isOpen) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [state.deletingDialog.isOpen]);

	return (
		<dialog ref={dialogRef} className={styles.dialog}>
			<div className={styles.dialog__body}>
				<h2 className={styles.dialog__heading}>Подтверждение удаления</h2>
				<p className={styles.dialog__description}>
					Вы уверены что хотите удалить планету: {state.deletingDialog.planetName}?
				</p>
			</div>
			<div className={styles.dialog__foot}>
				<Button size="small" onClick={closeDeletingDialog}>
					Отмена
				</Button>
				<Button size="small" theme="danger" onClick={handleDelete}>
					Удалить
				</Button>
			</div>
		</dialog>
	);
});

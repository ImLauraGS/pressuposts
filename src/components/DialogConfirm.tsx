import React from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

export function DialogConfirm({ isOpen, onClose, message }) {
  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Informació</DialogHeader>
      <DialogBody>
        <p>{message}</p>
      </DialogBody>
      <DialogFooter>
        <Button onClick={onClose} color="blue-gray">Tancar</Button>
      </DialogFooter>
    </Dialog>
  );
}

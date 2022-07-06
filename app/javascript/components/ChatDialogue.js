import React, { useContext } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import RoomList from "./RoomList";
import RepublishRoom from "./RepublishRoom";
import { AllRoomContext } from "../components/contexts/ContextFile";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChatDialogue() {
  let { allRooms } = useContext(AllRoomContext);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p
        className="pr-5 block md:inline uppercase my-3 md:my-0 cursor-pointer"
        onClick={handleClickOpen}
      >
        Messages
      </p>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"ChatRooms"}</DialogTitle>
        <DialogContent>
          <RoomList allRooms={allRooms} />
          <RepublishRoom />
        </DialogContent>
      </Dialog>
    </>
  );
}

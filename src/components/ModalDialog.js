import { Dialog, Slide, styled } from "@mui/material";
import React from "react";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root':{
    borderRadius:'16px',
    padding:'16px',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDialog(props) {
    const { onClose, open, children, maxWidth } = props;
  
    return (
      <StyledDialog onClose={onClose} open={open} maxWidth={typeof maxWidth!=='undefined' ? maxWidth:'sm' } scroll={'body'} TransitionComponent={Transition} transitionDuration={600} aria-describedby="alert-dialog-slide-description">
        {children}
      </StyledDialog>
    );
  }
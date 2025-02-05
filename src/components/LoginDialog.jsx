import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

const LoginDialog = ({ open, setOpenDialog, login }) => {
  return (
    <Dialog open={open} onOpenChange={setOpenDialog}>
      <DialogContent className="text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <FaGoogle />
            Sign in with Google
          </DialogTitle>
        </DialogHeader>
        <Button onClick={login} className="text-white flex gap-2 bg-black">
          <FaGoogle />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          onClick={() => setOpenDialog(false)}
          className="text-white"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;

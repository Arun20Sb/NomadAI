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
      <DialogContent className="text-gray-950 bg-gray-200">
        <DialogHeader>
          <DialogTitle className=" flex items-center gap-2">
            <FaGoogle />
            Sign in with Google
          </DialogTitle>
        </DialogHeader>
        <Button onClick={login} className="text-white flex gap-2 bg-black text-md">
          <FaGoogle />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          onClick={() => setOpenDialog(false)}
          className="text-gray-950 font-bold text-xl border-2 border-black"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;

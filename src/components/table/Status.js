import { Badge } from "@windmill/react-ui";

const Status = ({ status }) => {
  return (
    <>
      <span className="font-serif">
        {(status === "pending" || status === "PENDING" || status === "Inactive" ) && (
          <Badge type="warning">{status}</Badge>
        )}
        {status === "Waiting for Password Reset" && (
          <Badge type="warning">{status}</Badge>
        )}
        {status === "Processing" && <Badge>{status}</Badge>}
        {(status === "Delivered" || status === "Active" || status === "success" || status ===  "Waiting" || status === "waiting") && (
          <Badge type="success">{status}</Badge>
        )}
        {(status === "CANCELLED" || status === "cancelled" )     && <Badge type="danger">{status}</Badge>}

        {status === "new" && <Badge type="warning">{status}</Badge>}

        {status === "TRADED" && <Badge type="success">{status}</Badge>}
        {status === "REJECTED" && <Badge type="danger">{status}</Badge>}
    
        {status === "pending_new" && <Badge type="warning">{status}</Badge>}
        {status === "pending_new" && <Badge type="warning">{status}</Badge>}
      
      
        {status === "filled" && <Badge type="success">{status}</Badge>}

        {status === `All` && (
          <Badge className="dark:bg-teal-900 bg-teal-100">{status}</Badge>
        )}

        {status === `Open` && (
          <Badge className="dark:bg-teal-900 bg-green-200">{status}</Badge>
        )}

        {status === `Complete` && (
          <Badge className="dark:bg-teal-900 bg-green-400">{status}</Badge>
        )}

        {status === `POS-Completed` && (
          <Badge className="dark:bg-teal-900 bg-teal-100">{status}</Badge>
        )}
       
      </span>
    </>
  );
};

export default Status;

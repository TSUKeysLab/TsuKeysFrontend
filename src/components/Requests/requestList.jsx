import React from 'react';
import RequestCard from "./requestCard";

const RequestList = (requests, updated) => {
    console.log(requests.requests)

    return (
        <div>
            {requests.requests.map((r)=>(
                <RequestCard
                    id={r.id}
                    dateOfBooking={r.dateOfBooking}
                    fullname={r.fullname}
                    startTime={r.startTime}
                    endTime={r.endTime}
                    status={r.status}
                    ownerRole={r.ownerRole}
                    classroomNumber={r.classroomNumber}
                    updated={updated}
                />
            ))}
        </div>
    );
};

export default RequestList;
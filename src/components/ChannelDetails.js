const ChannelDetails = ({showChannelDetails}) => {
    return ( 
        <div className={`h-screen grow-4 bg-gray-600 text-gray-600 ${showChannelDetails ? "visible": "hidden"}`}>
            ChannelDetails
        </div>
    );
}
 
export default ChannelDetails;
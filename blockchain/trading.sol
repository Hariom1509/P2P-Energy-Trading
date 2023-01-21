pragma solidity ^0.8.0;

contract trader{

    struct Order{
        bytes32 pid;
        bytes32 cid;
        string area;
        uint kwh;
        uint price;
        uint cbal;
        uint time;
    }

    struct MyStruct {
        bytes32 id;
        string area;
        uint kwh;
        uint price;
        uint time;
    }
    
    Order[] public allOrders;
    event FCalled(MyStruct[] _a);

    function addOrder(string memory pid, string memory cid, string memory area, uint kwh, uint price, uint cbal) public payable returns (bytes32){
        
        uint flag = cbal - (price*kwh);

        bytes32 _pid = keccak256(abi.encodePacked(pid));
        bytes32 _cid = keccak256(abi.encodePacked(cid));

        uint time = block.timestamp;

        if(flag >=0 ){
            cbal = flag;
            allOrders.push(Order(_pid, _cid, area, kwh, price, cbal, time));
        }

        return allOrders[allOrders.length-1].pid;
    }

    function viewCustOrder(string memory id) public {
        uint count = 0;
        bytes32 _id = keccak256(abi.encodePacked(id));
        for(uint i=0; i<allOrders.length; ++i){
            if(allOrders[i].cid == _id)
            {
                count = count + 1;
            }
        }
        MyStruct[] memory a = new MyStruct[](count);
        for(uint i=0; i<allOrders.length; ++i){
            if(allOrders[i].cid == _id)
            {
                a[i] = MyStruct(allOrders[i].pid, allOrders[i].area, allOrders[i].kwh, allOrders[i].price, allOrders[i].time);
            }
        }

        emit FCalled(a);
    }

    function viewProsOrder(string memory id) public {
        uint count = 0;
        bytes32 _id = keccak256(abi.encodePacked(id));
        for(uint i=0; i<allOrders.length; ++i){
            if(allOrders[i].pid == _id)
            {
                count = count + 1;
            }
        }
        MyStruct[] memory a = new MyStruct[](count);
        for(uint i=0; i<allOrders.length; ++i){
            if(allOrders[i].pid == _id)
            {
                a[i] = MyStruct(allOrders[i].cid, allOrders[i].area, allOrders[i].kwh, allOrders[i].price, allOrders[i].time);
            }
        }

        emit FCalled(a);
    }

    function stringsEquals(string storage _a, string memory _b) internal view returns (bool) {
        bytes storage a = bytes(_a);
        bytes memory b = bytes(_b);
        if (a.length != b.length)
            return false;
        for (uint i = 0; i < a.length; i ++)
        {
            if (a[i] != b[i])
                return false;
        }
        return true;
    }
}
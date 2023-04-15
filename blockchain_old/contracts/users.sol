pragma solidity ^0.8.0;

contract Users{

    struct User{
        bytes32 id;
        string area;
        string typ;
        int balance;
    }
    
    User[] public allUsers;

    function addUser(string memory id, string memory area, string memory typ, int balance) public payable returns(bytes32){
        uint flag = 0;
        bytes32 _id = keccak256(abi.encodePacked(id));

        for(uint i=0; i<allUsers.length; ++i){
            if(allUsers[i].id == _id){
                flag = 1;
            }
        }

        if(flag == 0){
            allUsers.push(User(_id, area, typ, balance));
        }

        return allUsers[allUsers.length - 1].id;
    }

    function addBalance(string memory id, int balance) public payable returns(int){
        bytes32 _id = keccak256(abi.encodePacked(id));

        for(uint i=0;i<allUsers.length; ++i){
            if(allUsers[i].id == _id){
                allUsers[i].balance = allUsers[i].balance + balance;
            }
        }

        return allUsers[allUsers.length - 1].balance;
    }

    function viewBalance(string memory id) public view returns(int){
        bytes32 _id = keccak256(abi.encodePacked(id));
        uint flag = 0;

        for(uint i=0;i<allUsers.length; ++i){
            if(allUsers[i].id == _id){
                return allUsers[i].balance;
            }
            else{
                flag = 1;
            }
        }

        return 65536;
    }
}
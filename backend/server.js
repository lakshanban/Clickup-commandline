const express = require('express')
const cors = require('cors')
const app = express();
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

//request body parser
var bodyParser = require('body-parser')
app.use(cors());     //cross platform
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



//post request handler//////////////////////////////////////////////////////
app.post('/create',(req,res)=>{

console.log(req.body)

    var request = new XMLHttpRequest();

    request.open('POST', 'https://api.clickup.com/api/v2/list/14194446/task');
    
    //setting authorinzation key
    request.setRequestHeader('Authorization', 'pk_3826898_PU5YSI78A2JLFNHB965NP4MC68HNYUMT');
    request.setRequestHeader('Content-Type', 'application/json');
    
    //handling the response
    request.onreadystatechange = function () {
      if (this.readyState === 4) {

         if(this.status==200){  //if task created

            resbody={
                status: 'complete',
                id: JSON.parse(this.responseText).id,
                url: JSON.parse(this.responseText).url
                
            }

            res.json(resbody)
            console.log(this.responseText)
         }else{                            //if task creation failed

            resbody={
                status: 'incomplete',
                err: JSON.parse(this.responseText).err
            }

            res.json(resbody)

         }

         console.log(this.responseText)
      }
    };
    
    //request body
    var body = {
      'name': 'As a:'+req.body.as+' I should :'+req.body.should+' So that I:'+req.body.so,
      'description': 'As a:'+req.body.as+' I should :'+req.body.should+' So that I:'+req.body.so,
      'assignees': [
        183
      ],
      'tags': [
        'tag name 1'
      ],
      'status': '',
      'priority': 3,
      'due_date': 1508369194377,
      'due_date_time': false,
      'time_estimate': 8640000,
      'start_date': 1567780450202,
      'start_date_time': false,
      'notify_all': true,
      'parent': null,
      'links_to': null,
      'custom_fields': [
        {
          'id': '0a52c486-5f05-403b-b4fd-c512ff05131c',
          'value': 23
        },
        {
          'id': '03efda77-c7a0-42d3-8afd-fd546353c2f5',
          'value': 'Text field input'
        }
      ]
    };
    
    request.send(JSON.stringify(body));

    console.log(body)

})

///////////////////////////////////////////////////////////////////////////////


//listening on port 8080

app.listen(8080 , ()=>{

    console.log('server is running on 8080')
})
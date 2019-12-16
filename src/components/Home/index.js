import React from 'react';
import TextBox from '../TextBox';
import Tweet from '../Tweet/tweet';
import './style.css'
import { getListOfTweets, createTweetWithAPI } from '../api'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetList: [],
            loading: true
        }
    }

    componentDidMount() {
        document.getElementById('homeTab').classList.add('whiteText')
        if (document.getElementById('profileTab').classList.contains('whiteText')) {
            document.getElementById('profileTab').classList.remove('whiteText')
        }
        this.getListFromAPI();
        setInterval(()=>{this.getListFromAPI()},30000);
        //this.setState({tweetList:this.getListFromLocalStorage()})
    }

    
    /*  getListFromLocalStorage(){
         let list=JSON.parse(localStorage.getItem('ListOfTweets'));
         console.log("LIST"+list);
         if(list == null){
             list=[];
         }
         return list;
     }
  */

    getListFromAPI() {
        console.log("got list from api")
        getListOfTweets().then((response) => {
            let sortedList=response.data.tweets.sort((a, b) => (a.date < b.date) ? 1 : -1)
            this.setState({ tweetList: sortedList, loading: false })
            document.getElementById('tweetButton').disabled = 'false';
        })
    }

    submitTweet(name, text, date) {
        document.getElementById('tweetButton').disabled = 'true';
        let box = document.getElementById('newTweetBox')
        this.setState({ loading: true });
        const obj = { 'content': text, 'userName': name, 'date': date };
        createTweetWithAPI(obj).then((response) => {
            const newList=this.state.tweetList;
            newList.unshift(obj);
           this.setState({tweetList:newList,loading: false})
            box.value = '';
        }).catch((error) => {
            box.value = error;
        })

        //let list=this.state.tweetList;
        /*  let localStorageList=this.getListFromLocalStorage();
         debugger
         localStorageList.push(obj);
         localStorage.setItem('ListOfTweets',JSON.stringify(localStorageList))
         /* list.push(obj);
         this.setState({ tweetList: list }) 
         this.setState({ tweetList:localStorageList}) */


    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center w-100 tweetTextBox">
                <TextBox onClick={(name, text, date) => { this.submitTweet(name, text, date) }} />
                {!this.state.loading &&
                    (this.state.tweetList.length > 0 &&
                        <div className="d-flex flex-column align-items-center w-100 mt-3">
                            {this.state.tweetList.map((tweet, i) => {
                                return (<div key={i} className="w-100 justify-content-center d-flex">
                                    <Tweet key={i} name={tweet.userName} date={tweet.date} text={tweet.content} />
                                </div>);
                            })}
                        </div>)}
            </div>);
    }
}
export default Home;
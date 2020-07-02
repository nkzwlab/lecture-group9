// クライアントからサーバーへの接続要求
const socket = io.connect();

// 接続時の処理
// ・サーバーとクライアントの接続が確立すると、
// 　サーバー側で、'connection'イベント
// 　クライアント側で、'connect'イベントが発生する
socket.on(
    'connect',
    () =>
    {
        console.log( 'connect' );
    } );

var myname;
// 「Join」ボタンを押したときの処理
$( '#join-form' ).submit(
    () =>
    {
        console.log( '#input_nickname :', $( '#input_nickname' ).val() );

        if( $( '#input_nickname' ).val() )
        {
            socket.emit( 'join', $( '#input_nickname' ).val() );

            $( '#nickname' ).html( $( '#input_nickname' ).val() );
            $( '#join-screen' ).hide();
            $( '#chat-screen' ).show();
            myname = $( '#input_nickname' ).val();
        }

        return false;   

// 「Send」ボタンを押したときの処理
$( 'form' ).submit(
    () =>
    {
        console.log( '#input_message :', $( '#input_message' ).val() );

        if( $( '#input_message' ).val() )
        {
            socket.emit( 'new message', $( '#input_message' ).val() );

            $( '#input_message' ).val( '' );  
        return false; 
    } );

// サーバーからのメッセージ拡散に対する処理
// ・サーバー側のメッセージ拡散時の「io.emit( 'spread message', strMessage );」に対する処理
socket.on(
    'spread message',
    ( objMessage ) =>
    {
        console.log( 'spread message :', objMessage );

        console.log(objMessage.strNickname);

        const strText = objMessage.strDate + ' - [' + objMessage.strNickname + '] ' + objMessage.strMessage;


        const li_element = $( '<li>' ).text( strText );
        $( '#message_list' ).prepend( li_element ); // リストの一番上に追加
        //$( '#message_list' ).append( li_element );    // リストの一番下に追加
    } );

<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

defined ('_EXEC') or exit;
class smtp
{
    const NEWLINE = "\r\n";

    public
        $username, $password, $connectTimeout, $responseTimeout,
        $headers, $contentType, $from, $to, $cc, $log;

    private $server, $port, $localhost, $skt, $subject, $body;

    public function __construct($server, $username, $password, $port = 25)
    {
    	
        $this->server = $server;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;

        $this->localhost = 'localhost';
        $this->connectTimeout = 30;
        $this->responseTimeout = 8;
        $this->from = array();
        $this->to = array();
        $this->cc = array();
        $this->log = array();
        $this->headers = array();
        $this->headers['MIME-Version'] = '1.0';
        $this->headers['Content-type'] = 'text/html; charset=utf-8';
        $this->headers['Content-Transfer-Encoding'] = '8bit';
    }

    public function addTo($addr, $name = '')
    {
        $this->to[] = array($addr, $name);
    }

    public function addCc($addr, $name = '')
    {
        $this->cc[] = array($addr, $name);
    }

    public function setFrom($addr, $name = '')
    {
        $this->from = array($addr, $name);
    }

    public function setHeader($key, $value)
    {
        $this->headers[$key] = $value;
    }

    public function setSubject($subject)
    {
        $this->subject = $subject;
    }

    public function setBody($body)
    {
        $this->body = $body;
    }

    public function send()
    {
        $newLine = self::NEWLINE;

        //Connect to the host on the specified port
        $this->skt = fsockopen($this->server, $this->port, $errno, $errstr, $this->connectTimeout);

        if (empty($this->skt))
            return false;

        $this->log['connection'] = $this->getResponse();

        //Say Hello to SMTP
        $this->log['helo']     = $this->sendCmd("EHLO {$this->localhost}");

        //Request Auth Login
        $this->log['auth']     = $this->sendCmd("AUTH LOGIN");
        $this->log['username'] = $this->sendCmd(base64_encode($this->username));
        $this->log['password'] = $this->sendCmd(base64_encode($this->password));

        //Email From
        $this->log['mailfrom'] = $this->sendCmd("MAIL FROM:<{$this->from[0]}>");

        //Email To
        $i = 1;
        foreach (array_merge($this->to,$this->cc) as $addr)
            $this->log['rcptto'.$i++] = $this->sendCmd("RCPT TO:<{$addr[0]}>");

        //The Email
        $this->log['data1'] = $this->sendCmd('DATA');

        //Construct Headers
        if (!empty($this->contentType))
            $this->headers['Content-type'] = $this->contentType;
        $this->headers['From'] = $this->fmtAddr($this->from);
        $this->headers['To'] = $this->fmtAddrList($this->to);
        if (!empty($this->cc))
            $this->headers['Cc'] = $this->fmtAddrList($this->cc);
        $this->headers['Subject'] = $this->subject;
        $this->headers['Date'] = date('r');

        $headerStr = '';
        foreach ($this->headers as $key => $val)
            $headerStr .= $key . ': ' . $val . self::NEWLINE;

        $this->log['data2'] = $this->sendCmd("{$headerStr}{$newLine}{$this->body}{$newLine}.");

        // Say Bye to SMTP
        $this->log['quit']  = $this->sendCmd('QUIT');

        fclose($this->skt);

        return substr($this->log['data2'], 0, 3) == '250';
    }

    private function getResponse()
    {
        stream_set_timeout($this->skt, $this->responseTimeout);
        $response = '';
        while (($line = fgets($this->skt, 515)) != false) {
            $response .= trim($line) . "\n";
            if (substr($line, 3, 1) == ' ') break;
        }
        return trim($response);
    }

    private function sendCmd($cmd)
    {
        fputs($this->skt, $cmd . self::NEWLINE);
        return $this->getResponse();
    }

    private function fmtAddr(&$addr)
    {
        if ($addr[1] == '') return $addr[0]; else return "\"{$addr[1]}\" <{$addr[0]}>";
    }

    private function fmtAddrList(&$addrs)
    {
        $list = '';
        foreach ($addrs as $addr) {
            if ($list) $list .= ', '. self::NEWLINE ."\t";
            $list .= $this->fmtAddr($addr);
        }
        return $list;
    }
}

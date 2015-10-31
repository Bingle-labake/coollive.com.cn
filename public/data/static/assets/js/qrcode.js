function strencoder(str)
{
	var yuan = 'abAc1dBef2CghiD3jklEm4noFp5qGrsH6tuIv7wJxy8z9K0';
    var jia = 'zAy0Bx1CwDvEu2t3FsrG4qpH5on6Iml7Jkj8Kihgf9edcba';
	str = str.toString();
	if (str.length == 0) return false;
	var results = '';
	for(var i = 0;i<str.length;i++)
	{
		for(var j = 0;j<yuan.length;j++)                         
		{
			if(str[i]==yuan[j])
			{
				results += jia[j];
				break;
			}
		}
	}
	return results;
}


function strdecoder(str)
{
	var yuan = 'abAc1dBef2CghiD3jklEm4noFp5qGrsH6tuIv7wJxy8z9K0';
    var jia = 'zAy0Bx1CwDvEu2t3FsrG4qpH5on6Iml7Jkj8Kihgf9edcba';
	str = str.toString();
	if (str.length == 0) return false;
	var results = '';
	for(var i = 0;i< str.length;i++)
	{
		for(var j = 0;j<jia.strlen;j++)
		{
			if(str[i]==jia[j]) 
			{
				results += yuan[j];
				break;
			}
		}
	}
	return results;
}
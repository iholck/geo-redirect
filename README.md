# Geo-Redirect

Redirect http requests to a nearby server based on their geographic location.

## Description

Geographic DNS routing redirects your browser to a local server, based on your geolocation. Not all DNS providers support this. Geo-redirect will redirect your browser to a server near your location, based on your IP address, preserving the path part of the request. Supports ipapi.com and RFC1918 addresses though config files.

## Requirements

Geo-redirect is written in NodeJS and requires the NodeJS environment to run. A Dockerfile is also provided if you want to run in Docker on Linux. IPAPI lookups require an API key to allow lookups. Get one at <https://ipapi.com/product.>

## Installation

Copy the contents of the Geo-Redirect directory to a directory on the host that will run the application.

Copy the file .env-sample to a new file and rename the copy to .env
In a text editor, update the IPAPI key to the one you've obtained. Also, select location granularity by selecting which key of the IPAPI the response should be based on. Refer to <https://ipapi.com/documentation#api_response_objects> for a description of the keys.

Update addressMap.json with the subnets and locations of your internal RFC-1918 addresses, if any, using the same format as the response object chosen.

Finally, update pathMap.json with the response objects and the URLs to be redirected to.

In the command line prompt, navigate to the directory where the application is installed. Install the required nodejs libraries by issuing the command ‘npm install’.

## Use

In a command line prompt, issue the command ‘node server.js’.
Go to any path on your host at port 8080 and get redirected according to your location.

## Docker

### Building
To build a docker image for the application, issue the command 'docker build -t \<your image repository/tag\> .' from the command line.

### Running
Issue the command 'docker run -d --env IPAPI=\<your IPAPI key\> --env RESPONSE_KEY=\<Your response object name\> \<your image name\>

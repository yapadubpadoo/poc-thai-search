FROM elasticsearch:7.6.2

RUN mkdir /tmp/plugins
COPY ./thaichub2-7.6.2.zip /tmp/plugins/thaichub2-7.6.2.zip
RUN ./bin/elasticsearch-plugin install --batch file:///tmp/plugins/thaichub2-7.6.2.zip
RUN ./bin/elasticsearch-plugin install analysis-icu

# RUN ./bin/elasticsearch-plugin jettro/elasticsearch-gui 
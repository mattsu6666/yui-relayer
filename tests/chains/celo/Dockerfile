FROM golang:1.17.10-buster as builder

WORKDIR /workspace
COPY ./celo-blockchain/ ./

RUN go get ./cmd/geth/...
RUN go get ./cmd/mycelo/...
# installed to /go/bin/*


FROM frolvlad/alpine-glibc:alpine-3.15

ARG MNEMONIC
ARG NODE_DIR

COPY --from=builder /go/bin/mycelo /usr/bin/mycelo
COPY --from=builder /go/bin/geth /usr/bin/geth
COPY --from=builder /workspace/celo-monorepo /workspace/celo-monorepo
COPY ./scripts/entrypoint.sh /entrypoint.sh

WORKDIR /workspace

RUN mkdir -p ${NODE_DIR}
RUN mycelo genesis --newenv ${NODE_DIR} --buildpath /workspace/celo-monorepo/packages/protocol/build/contracts/ \
  --mnemonic "${MNEMONIC}" \
  --geth.http.addr "0.0.0.0"
# --geth.http.api "eth,net,web3" \
# --node.port 40303 \
# --rpc.port 7545
RUN rm -rf /workspace/celo-monorepo
RUN mycelo validator-init --geth geth ${NODE_DIR}

ENV CELO_ENV=${NODE_DIR}

EXPOSE 8545 8546 8547 30303 30303/udp 30304 30304/udp 30305 30305/udp

ENTRYPOINT ["/entrypoint.sh"]

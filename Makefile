CMD = docker-compose
RAILS = $(CMD) exec backend rails
CURRENT_DIR = $(shell pwd | sed -e "s/\/cygdrive//g")
BACKEND = leatheref-api-server

ps:
	$(CMD) ps

down:
	$(CMD) down

up:
	$(CMD) up -d

.PHONY: restart
ifeq (restart,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif
restart:
	$(CMD) kill $(RUN_ARGS)
	$(CMD) rm -f $(RUN_ARGS)
	rm -f $(CURRENT_DIR)/$(BACKEND)/tmp/pids/server.pid
	$(CMD) up -d $(RUN_ARGS)

.PHONY: logs
ifeq (logs,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif
logs:
	$(CMD) logs --follow --timestamps $(RUN_ARGS)

.PHONY: build
ifeq (build,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif
build:
	$(CMD) build $(RUN_ARGS)

# railsコンテナ用
bundle:
	$(CMD) exec backend bundle install

console:
	$(RAILS) console

create:
	$(RAILS) db:create

migrate:
	$(RAILS) db:migrate

seed:
	$(RAILS) db:seed

routes:
	$(RAILS) routes

spec:
	$(CMD) exec backend rspec

bin:
	$(CMD) exec backend bash
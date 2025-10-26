reset-db:
	@echo "🔄 Resetando banco de dados..."
	docker-compose down -v
	docker-compose up -d
	npx prisma migrate reset --force